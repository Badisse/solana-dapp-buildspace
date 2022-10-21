import { NextPage } from "next";
import Image from 'next/image'


interface Props {
    gifs: string[];
}

const Grid: NextPage<Props> = (props) => {
    const { gifs } = props;

    return (
        <div className="grid grid-cols-3 gap-4">
            {gifs?.map(gif => (
                <div key={gif} className='h-20 w-20 md:h-64 md:w-96 relative'>
                    <Image src={gif} layout='fill' objectFit="contain" className='rounded-lg' />
                </div>
            ))}
        </div>
    )
}

export default Grid;