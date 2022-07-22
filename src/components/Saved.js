import React, { useState } from 'react';
import '../style.css';
import { GoTrashcan } from 'react-icons/go';

const Saved = ({ list, cat, catList, handlerem, setLoading }) => {
    const [results, setResults] = useState([...list]);
    const [searchterm, setSearchterm] = useState();
    const [disp, setDisp] = useState([]);

    //update searchterm state
    const handleSearch = (e) => {
        let sea = e.target.value;
        setSearchterm(sea);
        if (sea === cat[0]) {
            setDisp([]);
        } else if (sea === cat[1]) {
            setDisp(list);
        } else {
            const filt = results.filter((title) => {
                return title.data.cat.includes(sea);
            });
            setSearchterm(sea);
            setDisp(filt);
        }
    };

    //view all button
    const viewAll = () => {
        setDisp(list);
        setSearchterm('view all');
    };

    //remove button
    const remove = (card, idx, kitty) => {
        setLoading(true);
        const newList = [...list];
        const newCats = [...cat];
        var catIdx = cat.indexOf(kitty); //get index of category from category array
        let results = newList.filter((itm) => {
            return itm.data.cat.includes(kitty);
        });

        //if viewing all recipes, remove selected item
        if (searchterm === 'view all') {
            newList.splice(idx, 1);
            setDisp(newList);
            //if it's the only item in its category, remove the category from the list
            if (results.length <= 1) {
                newCats.splice(catIdx, 1);
                //send cats list to parent
                catList(newCats);
                let zero = newCats[0];
                setSearchterm(zero);
            }
        } else {
            results.splice(idx, 1);
            //if it's the only item in its category, remove the category from the list
            if (results.length === 0) {
                newCats.splice(catIdx, 1);
                setDisp([]);
                catList(newCats);
            } else {
                setDisp(results);
            }
        }
        //send the recipe to the function that'll make the api call
        handlerem(card);
    };

    return (
        <div className='editor'>
            <div className='header'>
                <h1>Categories</h1>
                <label for='categories' hidden>
                    Categories:
                </label>
            </div>
            <div className='blue'>
                <div className='ddown'>
                    <select
                        name='categories'
                        id='categories'
                        onChange={handleSearch}
                    >
                        {cat.map((kitten, index) => (
                            <option
                                index={index}
                                category={kitten}
                                value={kitten}
                            >
                                {searchterm === 'select a category'
                                    ? 'select a category'
                                    : kitten}
                            </option>
                        ))}
                    </select>
                    <button id='viewAll' onClick={viewAll} className='viewall'>
                        View All
                    </button>
                </div>
                <div className='entrylist'>
                    {disp.map((title, index) => (
                        <span className='span' key={index}>
                            <a
                                href={title.data.link}
                                value={title.data.name}
                                index={index}
                                category={title.data.cat}
                                id={title.key}
                            >
                                {title.data.name}
                            </a>
                            <button
                                id='close'
                                onClick={() => {
                                    remove(
                                        title,
                                        index,
                                        title.data.cat,
                                        title.data.name
                                    );
                                }}
                                className='x'
                                alt='trashcan icon to delete an entry'
                            >
                                <GoTrashcan className='icon trash' />
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Saved;
