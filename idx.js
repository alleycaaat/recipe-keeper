const { useState } = React;

const New = ({ updateentry, updatecats }) => {
	const [input, setInput] = useState({
		link: '',
		name: '',
		cat: ''
	});
	const { link, name, cat } = input;
	const handleSubmit = (e) => {
		e.preventDefault();
		setInput({
			link: '',
			name: '',
			cat: ''
		});
	};

	const submit = () => {
		input.cat = input.cat.toLowerCase();
		if (input.cat === '') {
			input.cat = 'uncategorized';
		}
		updateentry(input);
		updatecats(input.cat);
	};

	const handleChange = (e) => {
		const { name, value } = e.currentTarget;
		setInput({ ...input, [name]: value });
	};

	return (
		<div className='editor'>
			<div className='header'><h1>Add a new recipe</h1></div>
			<div className='blue'>
				<form onSubmit={ handleSubmit }>
					<div className='input'>
						<span className='ins'>
							<input
								type='url'
								name='link'
								value={ link }
								onChange={ handleChange }
								placeholder='insert recipe url'
								required
							/><img src='https://achulslander.com/img/pencil-24.png' alt='pencil icon' className='icon' />
						</span>
						<span className='ins'>
							<input
								type='text'
								name='name'
								value={ name }
								onChange={ handleChange }
								placeholder='insert recipe title'
								required
							/><img src='https://achulslander.com/img/pencil-24.png' alt='pencil icon' className='icon' />
						</span>
						<span className='ins'>
							<input
								type='text'
								name='cat'
								value={ cat }
								onChange={ handleChange }
								placeholder='recipe category'
							/><img src='https://achulslander.com/img/pencil-24.png' alt='pencil icon' className='icon' />
						</span>
					</div>
					<button
						type='submit'
						onClick={ submit }
						className='buttons submit'>
						Save to Recipe Box
					</button>
				</form>
			</div>
		</div>
	);
};
const Home = () => {
	return (
		<div className='editor'>
			<div className='header'>
				<h1>Recipe Keeper</h1>
			</div>
			<div className='blue'>
				<p className='welcome'>
					Welcome to Recipe Keeper! I developed this project because I
					wanted a better option for saving recipes, as previously I
					was just pasting links into a note on my phone. It was the
					perfect excuse to improve my skills, so recipe-keeper
					was born.
					<br />
					<br />
					Recipe-keeper was built with ReactJS, including the useState hook, and SCSS.
				</p>
			</div>
		</div>
	);
};

const Saved = ({ list, cat, handlecats, handleremove }) => {
	const [results, setResults] = useState([...list]);
	const [search, setSearch] = useState();
	const [disp, setDisp] = useState([]);
	const [cats, setCats] = useState([...cat]);

	const handleSearch = (e) => {
		let sea = e.target.value;
		setSearch(sea);
		if (sea === cat[0]) {
			setDisp([]);
		} else if (sea === cat[1]) {
			setDisp(results);
		} else {
			const filt = results.filter(title => {
				return title.cat.includes(sea);
			});
			setSearch(sea);
			setDisp(filt);
		}
	};

	const viewAll = () => {
		setDisp(results);
		setSearch('view all');
	};

	const remove = (idx, kitty, title) => {
		const newList = [...list];
		const newCats = [...cat];
		var searchTerm = [search];
		var catIdx = cat.indexOf(kitty); //get index of category from category array
		let index = list.findIndex(o => o.name == title); //get index of recipe name from entries array
		let results = newList.filter(o => { //returns list of items in category
			return o.cat.includes(kitty);
		});
		//if viewing all recipes, remove selected item
		if (searchTerm == 'view all') {
			newList.splice(idx, 1);
			setDisp(newList);
			setResults(newList);
			handleremove(newList);
			//if it's the only item in its category, remove the category from the list
			if (results.length <= 1) {
				newCats.splice(catIdx, 1);
				setCats(newCats);
				handlecats(newCats);
			}
			//if looking at a category, remove selected item
		} else {
			newList.splice(index, 1);
			results.splice(idx, 1);
			setResults(newList);
			handleremove(newList);
			//if it's the only item in its category, remove the category from the list
			if (results.length < 1) {
				newCats.splice(catIdx, 1);
				setDisp([]);
				setCats(newCats);
				handlecats(newCats);
				//otherwise just update the display
			} else {
				setDisp(results);
			}
		}
	};

	return (
		<div className='editor'>
			<div className='header'><h1>Categories</h1><label for='categories' hidden>Categories:</label></div>
			<div className='blue'>
				<div className='ddown'>
					<select name='categories' id='categories' onChange={ handleSearch }>
						{ cats.map((kitten, index) => (
							<option
								index={ index }
								category={ kitten }
								value={ kitten }>
								{ search === 'select a category'
									? 'select a category'
									: kitten }
							</option>
						)) }
					</select>
					<button
						id='viewAll'
						onClick={ viewAll }
						className='viewall'>
						View All
					</button>
				</div>
				<div className='entrylist'>
					{ disp.map((title, index) => (
						<span className='span'>
							<a href={ title.link } value={ title.name } index={ index } category={ title.cat }>{ title.name }</a>
							<button
								id='close'
								onClick={ () => { remove(index, title.cat, title.name); } }
								className='x'>
								<img className='icon trash' src='https://achulslander.com/img/trash-can-32.png' alt='trash can icon' />
							</button>
						</span>
					)
					) }
				</div>
			</div>
		</div>
	);
};
const App = () => {
	const [active, setActive] = useState('Home');
	const [entry, setEntry] = useState([
		{
			link: 'https://www.karissasvegankitchen.com/vegan-oatmeal-chocolate-chip-cookies/',
			name: 'Oatmeal chocolate chip cookies',
			cat: 'cookies'
		},
		{
			link: 'https://lovingitvegan.com/vegan-tofu-scramble/',
			name: 'tofu scramble',
			cat: 'breakfast'
		},
		{
			link: 'https://simpleveganblog.com/seitan/',
			name: 'seitan',
			cat: 'supper'
		},
		{
			link: 'https://www.foodiecrush.com/broccoli-cheese-potato-soup/',
			name: 'Broccoli cheese potato soup',
			cat: 'soup'
		},
		{
			link: 'https://chocolatecoveredkatie.com/vegan-chocolate-chip-cookies-recipe/',
			name: 'Chocolate chip cookies',
			cat: 'cookies'
		},
		{
			link: 'https://chocolatecoveredkatie.com/vegan-cake-recipe/',
			name: 'Vegan cake',
			cat: 'cake'
		},
		{
			link: 'https://biancazapatka.com/en/vegan-chocolate-banana-bread/',
			name: 'Chocolate banana bread',
			cat: 'bread'
		},
		{
			link: 'https://simple-veganista.com/easy-spicy-mac-n-cheese-nut-free-soy/',
			name: 'Spicy mac and cheese',
			cat: 'pasta'
		},
		{
			link: 'https://www.modernhoney.com/the-best-snickerdoodle-cookie-recipe/',
			name: 'Snickerdoodle cookies',
			cat: 'cookies'
		},
		{
			link: 'https://www.allrecipes.com/recipe/155534/vegan-cupcakes/',
			name: 'Cupcakes',
			cat: 'cake'
		},
		{
			link: 'https://chelsweets.com/2020/04/13/vegan-buttercream/',
			name: 'Buttercream frosting',
			cat: 'frosting'
		},
		{
			link: 'https://holycowvegan.net/perfect-sandwich-bread/#wprm-recipe-container-15259',
			name: 'Sandwich bread',
			cat: 'bread'
		},
		{
			link: 'https://makeitdairyfree.com/easy-vegan-bread/',
			name: 'Easy bread',
			cat: 'bread'
		},
		{
			link: 'https://afoodloverskitchen.com/crispy-roast-potatoes/',
			name: 'Crispy roast potatoes',
			cat: 'potatoes'
		},
		{
			link: 'https://www.google.com/amp/s/www.mccormick.com/recipes/salads-sides/garlic-and-herb-roasted-potatoes%3famp=1',
			name: 'Garlic and herb roasted potatoes',
			cat: 'potatoes'
		},
		{
			link: 'https://tasty.co/recipe/the-fluffiest-vegan-pancakes',
			name: 'Fluffy pancakes',
			cat: 'breakfast'
		},
		{
			link: 'https://www.ilovevegan.com/easy-1-pot-vegan-mac-cheese/',
			name: 'One pot mac and cheese',
			cat: 'pasta'
		},
		{
			link: 'https://veganheaven.org/recipe/cauliflower-hot-wings-with-vegan-aioli/',
			name: 'Cauliflower hot wings',
			cat: 'finger food'
		},
		{
			link: 'https://www.thespruceeats.com/best-easy-sugar-cookie-recipe-304882',
			name: 'Sugar cookies',
			cat: 'cookies'
		},
		{
			link: 'https://www.livewellbakeoften.com/the-best-carrot-cake-recipe/#wprm-recipe-container-16742',
			name: 'Carrot cake',
			cat: 'cake'
		},
		{
			link: 'https://sugarspunrun.com/easy-homemade-biscuits/',
			name: 'Homemade biscuits',
			cat: 'bread'
		},
		{
			link: 'https://www.hotforfoodblog.com/recipes/2016/07/11/how-to-make-a-vegan-omelette/',
			name: 'Vegan omelette',
			cat: 'breakfast'
		},
		{
			link: 'https://kirbiecravings.com/no-bake-healthy-brownies/',
			name: 'No bake brownies',
			cat: 'dessert'
		},
		{
			link: 'https://www.bettycrocker.com/recipes/oatmeal-chocolate-chip-cookies/48acadc3-f7e1-46b5-bb33-33bee95f6cf7',
			name: 'Chocolate chip cookies',
			cat: 'cookies'
		},
		{
			link: 'https://sweetsimplevegan.com/2020/08/best-vegan-oatmeal-raisin-cookies/',
			name: 'Oatmeal raisin cookies',
			cat: 'cookies'
		},
		{
			link: 'https://bakeorbreak.com/2020/10/cookie-butter-cheesecake-brownies/',
			name: 'Cookie butter cheesecake brownies',
			cat: 'dessert'
		},
		{
			link: 'https://www.allrecipes.com/recipe/20171/quick-and-easy-pizza-crust/',
			name: 'Quick and easy pizza crust',
			cat: 'supper'
		},
		{
			link: 'https://www.noracooks.com/banana-bread/',
			name: 'Banana bread',
			cat: 'bread'
		},
		{
			link: 'http://atomicrecipes.blogspot.com/2015/06/gooey-vegan-butterscotch-chip-cookies.html?m=1',
			name: 'Butterschotch chip cookies',
			cat: 'cookies'
		},
		{
			link: 'https://www.halfbakedharvest.com/bourbon-caramel-pretzel-cookies/',
			name: 'Bourbon caramel pretzel cookies',
			cat: 'cookies'
		},
		{
			link: 'https://www.allrecipes.com/recipe/18088/aunt-marys-eggplant-balls/',
			name: 'Eggplant balls',
			cat: 'supper'
		},
		{
			link: 'https://lovingitvegan.com/vegan-chocolate-sugar-cookies/',
			name: 'Chocolate sugar cookies',
			cat: 'cookies'
		},
		{
			link: 'https://onehotoven.com/baileys-irish-cream-chocolate-truffles/?_gl=1*1n4einv*_ga*NWpmRDBVWWtjWkJfUDZhMzVHdWtRdThTdmtYalJrUWFxdk1BekotRHI0MlBqZmlqTEt4RVNiYVZraUhBX3VjcQ',
			name: 'Irish cream chocolate truffles',
			cat: 'dessert'
		},
		{
			link: 'https://www.aldi.us/en/recipes/breakfast-brunch/bowls-wraps-bites/vegan-protein-oatmeal-bites/',
			name: 'Protien oatmeal bites',
			cat: 'breakfast'
		},
		{
			link: 'https://www.aldi.us/en/recipes/lunch-dinner/vegan-vegetarian/cauliflower-steaks-with-cranberry-chipotle-bbq/',
			name: 'Cauliflower steak',
			cat: 'supper'
		},
		{
			link: 'https://www.ambitiouskitchen.com/crispy-toasted-quinoa-chocolate-peanut-butter-truffles/',
			name: 'Quinoa chocolate peanut butter truffles',
			cat: 'dessert'
		},
		{
			link: 'https://sallysbakingaddiction.com/baked-oatmeal/',
			name: 'Baked oatmeal',
			cat: 'dessert'
		},
		{
			link: 'https://simple-veganista.com/chickpea-tikka-masala/#tasty-recipes-29370-jump-target',
			name: 'Chickpea tikka masala',
			cat: 'supper'
		},
		{
			link: 'https://minimalistbaker.com/italian-herb-crispy-baked-tofu/',
			name: 'Italian herb crispy baked tofu',
			cat: 'finger food'
		}
	]);
	const [cats, setCats] = useState(['select a category', 'view all', 'cookies', 'cake', 'frosting', 'supper', 'finger food', 'dessert', 'breakfast', 'pasta', 'soup', 'bread', 'potatoes']);
	const [display, setDisplay] = useState([]);
	const updateEntry = (newentry) => {
		setEntry([...entry, newentry]);
	};
	const handlecats = (kitty) => {
		setCats(kitty);
	};
	const updateCats = (newcat) => {
		if (!cats.includes(newcat)) {
			setCats([...cats, newcat]);
		}
	};
	const handleRemove = (entry) => {
		setEntry(entry);
	};
	return (
		<div className='wrapper'>
			<div className='tabs'>
				<button
					className={ 'tab' + (active == 'Home' ? ' active' : ' inactive') }
					onClick={ () => setActive('Home') }>
					Home
				</button>
				<button
					className={ 'tab' + (active == 'Saved' ? ' active' : ' inactive') }
					onClick={ () => setActive('Saved') }>
					Saved
				</button>
				<button
					className={ 'tab' + (active == 'New' ? ' active' : ' inactive') }
					onClick={ () => setActive('New') }>
					New
				</button>
			</div>
			<div className='notepad'>
				{ active === 'New' && <New
					updateentry={ updateEntry } updatecats={ updateCats } /> }
				{ active === 'Home' && <Home /> }
				{ active === 'Saved' && <Saved
					list={ entry }
					cat={ cats }
					handlecats={ handlecats }
					handleremove={ handleRemove }
				/> }
			</div>
			{ active === 'Home' && <div class='credit'>
				<p>Created by <a href='https://achulslander.com/' rel='noopener noreferrer' target='_blank'>AC Hulslander</a></p>

				<p><a href='https://codepen.io/alleycaaat/pens/public' target='_blank' rel='noopener noreferrer'>See my other pens</a></p>
				<p>View the Jamstack version code on
					<a href='https://github.com/alleycaaat/recipe-keeper-jamstack' target='_blank' rel='noopener noreferrer' > GitHub</a></p>
				<p>
					<a href='https://achulslander-recipe-keeper-jamstack.netlify.app/' target='_blank' rel='noopener noreferrer'>See a demo of the Jamstack version</a>
				</p>
				<p class='smol'><a target='_blank' href='https://icons8.com/icon/59856/pencil' rel='noreferrer noopener'>Pencil</a> icon by Icons8<br />
					<a target='_blank' href='https://icons8.com/icon/VgohOTwokAJu/trash-can' rel='noreferrer noopener'>Trash Can</a> icon by Icons8</p>
			</div> }
		</div>
	);
};
ReactDOM.render(<App />, document.getElementById('root'));