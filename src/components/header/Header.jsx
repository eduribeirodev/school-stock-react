import Button from "../button/Button";


export default function Header({title:Title, SubTitle:SubTitle, titleButton: TitleButton, iconButton:IconButton, functionButton: FunctionButton}){

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
            <Button title={TitleButton} icon={IconButton} onClick={FunctionButton} />
        </header>
    )

} 