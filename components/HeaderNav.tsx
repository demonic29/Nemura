import { SettingIcon } from '@/assets/icons'
import { useRouter } from 'next/navigation'

export default function HeaderNav({ title } : any) {

    const router = useRouter();

    return (
        <div>
            <header className="relative flex items-center justify-between mb-6">
                <button onClick={() => router.back()}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="title text-center">{ title }</h1>
                <SettingIcon
                    className="text-gray-400 cursor-pointer"
                    fontSize="medium"
                />
            </header>
        </div>
    )
}
