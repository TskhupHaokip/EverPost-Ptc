import { Title } from "../utils/util";

const Names: string[] = ["home", "feeds", "profile","register","login","logout"];

const ATags = (name: string) => {
  return <a href={`/${name}`} className="flex w-full justify-center rounded-[10px] p-1 hover:bg-black">{Title(name)}</a>;
};

const SideItems = () => {
  return (
    <>
      {Names.map((name, index) => (
        <li key={`side-${index}`} className={` w-full  border-none
        ${index === Names.length - 1? "mt-auto mb-2":""}
        `}>
          {ATags(name)}
        </li>
      ))}
    </>
  );
};

export default SideItems;