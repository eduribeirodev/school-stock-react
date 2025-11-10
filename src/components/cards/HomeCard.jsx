


export default function HomeCard({ title: Title, icon: Icon, p1:P1, quantidade:Qtde }) {
  return (
    <div className="  border border-gray-200  w-[19%]  rounded-xl bg-white/80 place-content-center py-4 shadow-xl">
      
      <div className="flex items-center justify-center pr-3 ">
        <p className=" px-4 text-black/80">{Title}</p>
        <Icon size={16} className="text-2xl text-black/60 p" />
      </div>
      <p className=" flex text-3xl  text-black/80  place-content-center py-4 ">
        {Qtde}
      </p>
        <p className="text-gray-400 pl-3 text-center">
            {P1}
        </p>
    </div>
  );
}
