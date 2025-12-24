import { SettingIcon } from '@/assets/icons'

export default function HeaderNav({ title } : any) {
    return (
        <div>
            <header className="relative flex items-center justify-between mb-6">
                <i className="fa-solid fa-arrow-left"></i>
                <h1 className="title text-center">{ title }</h1>
                <SettingIcon
                    className="text-gray-400 cursor-pointer"
                    fontSize="medium"
                />
            </header>
        </div>
    )
}
