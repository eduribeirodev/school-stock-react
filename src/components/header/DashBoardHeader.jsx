

export default function DashboardHeader({title:Title, SubTitle:SubTitle}){

    return(
        <header className="justify-between items flex ">
            <div>
                <p className="text-black/80 font-semibold text-3xl">
                {Title}
            </p>
            <p className="text-gray-500">
                {SubTitle}
            </p>
            </div>
        </header>
    )

} 