

export default function Button({title: Title, icon:Icon, onClick: onClick }){

    return (
            <button
            onClick={onClick}
            className=" text-white/95 bg-red-600 shadow-xl h-full p-2 flex items-center gap-2 rounded-lg">
            <Icon/>
            <p className="font-bold">{Title}</p>
            </button>
    )

}

