import React from 'react';
import { useState } from 'react';
import '../style.css';
import { GoPencil } from 'react-icons/go';

const New = ({ setLoading, addRec }) => {
    const [input, setInput] = useState({
        link: '',
        name: '',
        cat: '',
    });
    const { link, name, cat } = input;

    //submit button
    const handleSubmit = (e) => {
        e.preventDefault();
        //if no category given, mark it uncategorized
        if (input.cat === '') {
            input.cat = 'uncategorized';
        }
        setLoading(true);
        addRec(input);
        setInput({
            link: '',
            name: '',
            cat: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setInput({ ...input, [name]: value });
    };

    return (
        <div className='editor'>
            <div className='header'>
                <h1>Add a new recipe</h1>
            </div>
            <div className='blue'>
                <form onSubmit={handleSubmit}>
                    <div className='input'>
                        <span className='ins'>
                            <input
                                type='url'
                                name='link'
                                value={link}
                                onChange={handleChange}
                                placeholder='insert recipe url'
                                required
                            />
                            <GoPencil className='icon' />
                        </span>
                        <span className='ins'>
                            <input
                                type='text'
                                name='name'
                                value={name}
                                onChange={handleChange}
                                placeholder='insert recipe title'
                                required
                            />
                            <GoPencil className='icon' />
                        </span>
                        <span className='ins'>
                            <input
                                type='text'
                                name='cat'
                                value={cat}
                                onChange={handleChange}
                                placeholder='recipe category'
                            />
                            <GoPencil className='icon' />
                        </span>
                    </div>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className='buttons submit'
                    >
                        Save to Recipe Box
                    </button>
                </form>
            </div>
        </div>
    );
};

export default New;
