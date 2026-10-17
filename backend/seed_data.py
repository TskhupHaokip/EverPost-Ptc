import os
import random
import uuid
from io import BytesIO
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.db import transaction
from faker import Faker
from PIL import Image, ImageDraw
from api.models import Profile
from posts.models import Post, Like

User = get_user_model()
fake = Faker()


def generate_unique_image(width, height, text_content):
    """Generate an in-memory JPEG image."""
    bg_color = (
        random.randint(50, 220),
        random.randint(50, 220),
        random.randint(50, 220),
    )

    with Image.new("RGB", (width, height), bg_color) as img:
        draw = ImageDraw.Draw(img)
        draw.text(
            (20, height // 2 - 10),
            text_content,
            fill=(255, 255, 255),
        )

        with BytesIO() as buffer:
            img.save(buffer, format="JPEG", quality=85)
            image_bytes = buffer.getvalue()

    filename = f"generated_{uuid.uuid4().hex}.jpg"
    return ContentFile(image_bytes, name=filename)


def seed_database():
    print("Starting database seeding...")

    # STEP A: CREATE 1,000 USERS
    print("Creating users...")

    users_to_create = []
    generated_usernames = []

    for _ in range(10):
        # Random UUID suffix makes collisions with existing usernames
        # extremely unlikely.
        username = f"{fake.user_name()}_{uuid.uuid4().hex[:10]}"

        generated_usernames.append(username)

        user = User(
            username=username,
            is_active=True,
            is_staff=False,
        )
        user.set_password("password123")
        users_to_create.append(user)

    # Insert users efficiently.
    # bulk_create bypasses custom save() methods and save signals.
    User.objects.bulk_create(users_to_create)

    all_users = list(
        User.objects.filter(username__in=generated_usernames)
    )

    if len(all_users) != 10:
        raise RuntimeError(
            f"Expected 1000 users, found {len(all_users)}."
        )

    print("Creating profiles and profile images...")

    for index, user in enumerate(all_users, start=1):
        profile, _ = Profile.objects.get_or_create(user=user)

        profile.bio = fake.text(max_nb_chars=160)
        profile.pic = generate_unique_image(
            400, 400, f"Avatar {index}"
        )
        profile.cover = generate_unique_image(
            1200, 400, f"Cover {index}"
        )
        profile.save()

    # STEP B: CREATE 1,000 POSTS
    print("Creating posts and post images...")

    posts = []

    for index in range(1, 11):
        post = Post(
            user=random.choice(all_users),
            caption=fake.sentence(nb_words=12),
        )

        post.image = generate_unique_image(
            800, 600, f"Post {index}"
        )
        post.save()
        posts.append(post)

    # STEP C: CREATE 10,000 UNIQUE LIKES
    print("Creating likes...")

    likes_to_create = []
    existing_pairs = set()

    # The generated posts are new, so pairs involving these posts
    # should not overlap with likes on existing posts.
    while len(likes_to_create) < 30:
        user = random.choice(all_users)
        post = random.choice(posts)
        pair = (user.pk, post.pk)

        if pair in existing_pairs:
            continue

        existing_pairs.add(pair)
        likes_to_create.append(
            Like(user=user, post=post)
        )

    Like.objects.bulk_create(likes_to_create)

    print("\nSeeding completed!")
    print(f"Users created: {len(all_users)}")
    print(f"Profiles processed: {len(all_users)}")
    print(f"Posts created: {len(posts)}")
    print(f"Likes created: {len(likes_to_create)}")


if __name__ == "__main__":
    seed_database()