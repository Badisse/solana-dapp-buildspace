import { NextPage } from "next";
import Image from 'next/image'


interface Props {
    gifs: [];
}

const Grid: NextPage<Props> = (props) => {
    const { gifs } = props;

    return (
        <div className="grid grid-cols-3 gap-4">
            {gifs?.map((item, index) => (
                <div key={index} className='h-20 w-20 md:h-64 md:w-96 relative'>
                    <img src={item.gifLink} alt={item.gifLink} className='rounded-lg' />
                </div>
            ))}
        </div>
    )
}

export default Grid;