
export const Capitalize = (text:string) => {
    return text[0].toUpperCase() + text.slice(1)

}

export const Title = (text:string) => {
    return text
    .split(" ")
    .map(Capitalize)
    .join(" ")
}
    
export const CloseSidebar = () => {
    const drawer = document.getElementById("my-drawer-1") as HTMLInputElement | null

     if (drawer) {
        drawer.checked = false
     }

}