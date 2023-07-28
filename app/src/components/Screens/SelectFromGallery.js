import React, {useState} from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { setActiveScreen, navigateToPreviousScreen } from '../../store/screenSlice';
import { useDispatch } from 'react-redux';
import { addImage } from '../../store/postsSlice';

const SelectFromGallery = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(0);

    const handleSelect = (index) => {
        setSelected(index);
    };

    return (
        <div className="h-screen w-full flex flex-col justify-start">
            <div className="sticky top-0 z-10 flex justify-between items-center p-4">
                <div className="cursor-pointer">
                    <IoIosArrowRoundBack className="text-5xl" onClick={() => dispatch(navigateToPreviousScreen())} />
                </div>
                <div className="cursor-pointer" onClick={() => {
                        dispatch(addImage(`assets/image${selected + 1}.jpg`))
                    dispatch(setActiveScreen('imageTool'))
                    }}>
                    <span className="text-2xl">Next</span>
                </div>
            </div>
            <div className="flex flex-col items-center justify-cente mx-10">
                <h2 className="text-md font-bold">Select from your gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-5">
                    {
                        Array.from({ length: 7 }, (_, index) => {
                            return (
                                <img
                                    key={index}
                                    src={`assets/image${index + 1}.jpg`}
                                    alt="gallery"
                                    className={`w-33 md:w-full h-full object-cover rounded-xl cursor-pointer ${selected === index ? 'border-2 border-blue-500' : ''}`}
                                    style={{ aspectRatio: '1/1' }}
                                    onClick={() => handleSelect(index)}
                                    onDoubleClick={() => {
                                        dispatch(addImage(`assets/image${index + 1}.jpg`))
                                        dispatch(setActiveScreen('imageTool'))
                                    }
                                    }
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default SelectFromGallery;
