import "./style.css";
import React, { useState } from "react";
import New from "./New";
import Home from "./Home";
import Saved from "./Saved";

const App = () => {
  const [active, setActive] = useState("Home");
  const [entry, setEntry] = useState([
    {
      link: "https://www.karissasvegankitchen.com/vegan-oatmeal-chocolate-chip-cookies/",
      name: "Oatmeal chocolate chip cookies",
      cat: "cookies",
    },
    {
      link: "https://www.foodiecrush.com/broccoli-cheese-potato-soup/",
      name: "Broccoli cheese potato soup",
      cat: "soup",
    },
    {
      link: "https://chocolatecoveredkatie.com/vegan-chocolate-chip-cookies-recipe/",
      name: "Chocolate chip cookies",
      cat: "cookies",
    },
    {
      link: "https://chocolatecoveredkatie.com/vegan-cake-recipe/",
      name: "Vegan cake",
      cat: "cake",
    },
    {
      link: "https://biancazapatka.com/en/vegan-chocolate-banana-bread/",
      name: "Chocolate banana bread",
      cat: "bread",
    },
    {
      link: "https://simple-veganista.com/easy-spicy-mac-n-cheese-nut-free-soy/",
      name: "Spicy mac and cheese",
      cat: "pasta",
    },
    {
      link: "https://www.modernhoney.com/the-best-snickerdoodle-cookie-recipe/",
      name: "Snickerdoodle cookies",
      cat: "cookies",
    },
    {
      link: "https://www.allrecipes.com/recipe/155534/vegan-cupcakes/",
      name: "Cupcakes",
      cat: "cake",
    },
    {
      link: "https://chelsweets.com/2020/04/13/vegan-buttercream/",
      name: "Buttercream frosting",
      cat: "frosting",
    },
    {
      link: "https://holycowvegan.net/perfect-sandwich-bread/#wprm-recipe-container-15259",
      name: "Sandwich bread",
      cat: "bread",
    },
    {
      link: "https://makeitdairyfree.com/easy-vegan-bread/",
      name: "Easy bread",
      cat: "bread",
    },
    {
      link: "https://afoodloverskitchen.com/crispy-roast-potatoes/",
      name: "Crispy roast potatoes",
      cat: "potatoes",
    },
    {
      link: "https://www.google.com/amp/s/www.mccormick.com/recipes/salads-sides/garlic-and-herb-roasted-potatoes%3famp=1",
      name: "Garlic and herb roasted potatoes",
      cat: "potatoes",
    },
    {
      link: "https://tasty.co/recipe/the-fluffiest-vegan-pancakes",
      name: "Fluffy pancakes",
      cat: "breakfast",
    },
    {
      link: "https://www.ilovevegan.com/easy-1-pot-vegan-mac-cheese/",
      name: "One pot mac and cheese",
      cat: "pasta",
    },
    {
      link: "https://veganheaven.org/recipe/cauliflower-hot-wings-with-vegan-aioli/",
      name: "Cauliflower hot wings",
      cat: "finger food",
    },
    {
      link: "https://www.thespruceeats.com/best-easy-sugar-cookie-recipe-304882",
      name: "Sugar cookies",
      cat: "cookies",
    },
    {
      link: "https://www.livewellbakeoften.com/the-best-carrot-cake-recipe/#wprm-recipe-container-16742",
      name: "Carrot cake",
      cat: "cake",
    },
    {
      link: "https://sugarspunrun.com/easy-homemade-biscuits/",
      name: "Homemade biscuits",
      cat: "bread",
    },
    {
      link: "https://www.hotforfoodblog.com/recipes/2016/07/11/how-to-make-a-vegan-omelette/",
      name: "Vegan omelette",
      cat: "breakfast",
    },
    {
      link: "https://kirbiecravings.com/no-bake-healthy-brownies/",
      name: "No bake brownies",
      cat: "dessert",
    },
    {
      link: "https://www.bettycrocker.com/recipes/oatmeal-chocolate-chip-cookies/48acadc3-f7e1-46b5-bb33-33bee95f6cf7",
      name: "Chocolate chip cookies",
      cat: "cookies",
    },
    {
      link: "https://sweetsimplevegan.com/2020/08/best-vegan-oatmeal-raisin-cookies/",
      name: "Oatmeal raisin cookies",
      cat: "cookies",
    },
    {
      link: "https://bakeorbreak.com/2020/10/cookie-butter-cheesecake-brownies/",
      name: "Cookie butter cheesecake brownies",
      cat: "dessert",
    },
    {
      link: "https://www.allrecipes.com/recipe/20171/quick-and-easy-pizza-crust/",
      name: "Quick and easy pizza crust",
      cat: "supper",
    },
    {
      link: "https://www.noracooks.com/banana-bread/",
      name: "Banana bread",
      cat: "bread",
    },
    {
      link: "http://atomicrecipes.blogspot.com/2015/06/gooey-vegan-butterscotch-chip-cookies.html?m=1",
      name: "Butterschotch chip cookies",
      cat: "cookies",
    },
    {
      link: "https://www.halfbakedharvest.com/bourbon-caramel-pretzel-cookies/",
      name: "Bourbon caramel pretzel cookies",
      cat: "cookies",
    },
    {
      link: "https://www.allrecipes.com/recipe/18088/aunt-marys-eggplant-balls/",
      name: "Eggplant balls",
      cat: "supper",
    },
    {
      link: "https://lovingitvegan.com/vegan-chocolate-sugar-cookies/",
      name: "Chocolate sugar cookies",
      cat: "cookies",
    },
    {
      link: "https://onehotoven.com/baileys-irish-cream-chocolate-truffles/?_gl=1*1n4einv*_ga*NWpmRDBVWWtjWkJfUDZhMzVHdWtRdThTdmtYalJrUWFxdk1BekotRHI0MlBqZmlqTEt4RVNiYVZraUhBX3VjcQ",
      name: "Irish cream chocolate truffles",
      cat: "dessert",
    },
    {
      link: "https://www.aldi.us/en/recipes/breakfast-brunch/bowls-wraps-bites/vegan-protein-oatmeal-bites/",
      name: "Protien oatmeal bites",
      cat: "breakfast",
    },
    {
      link: "https://www.aldi.us/en/recipes/lunch-dinner/vegan-vegetarian/cauliflower-steaks-with-cranberry-chipotle-bbq/",
      name: "Cauliflower steak",
      cat: "supper",
    },
    {
      link: "https://www.ambitiouskitchen.com/crispy-toasted-quinoa-chocolate-peanut-butter-truffles/",
      name: "Quinoa chocolate peanut butter truffles",
      cat: "dessert",
    },
    {
      link: "https://sallysbakingaddiction.com/baked-oatmeal/",
      name: "Baked oatmeal",
      cat: "dessert",
    },
    {
      link: "https://simple-veganista.com/chickpea-tikka-masala/#tasty-recipes-29370-jump-target",
      name: "Chickpea tikka masala",
      cat: "supper",
    },
    {
      link: "https://minimalistbaker.com/italian-herb-crispy-baked-tofu/",
      name: "Italian herb crispy baked tofu",
      cat: "finger food",
    },
  ]);
  const [cats, setCats] = useState([
    "select a category",
    "view all",
    "cookies",
    "cake",
    "frosting",
    "supper",
    "finger food",
    "dessert",
    "breakfast",
    "pasta",
    "soup",
    "bread",
    "potatoes",
  ]);

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
          className={"tab" + (active === "Home" ? " active" : " inactive")}
          onClick={() => setActive("Home")}
        >
          Home
        </button>
        <button
          className={"tab" + (active === "Saved" ? " active" : " inactive")}
          onClick={() => setActive("Saved")}
        >
          Saved
        </button>
        <button
          className={"tab" + (active === "New" ? " active" : " inactive")}
          onClick={() => setActive("New")}
        >
          New
        </button>
      </div>
      <div className='notepad'>
        {active === "New" && (
          <New updateentry={updateEntry} updatecats={updateCats} />
        )}
        {active === "Home" && <Home />}
        {active === "Saved" && (
          <Saved
            list={entry}
            cat={cats}
            handlecats={handlecats}
            handleremove={handleRemove}
          />
        )}
      </div>
      {active === "Home" && (
        <div class='credit'>
          <p>
            Created by{" "}
            <a
              href='https://achulslander.com/'
              rel='noopener noreferrer'
              target='_blank'
            >
              AC Hulslander
            </a>
          </p>
          <p>
            <a
              href='https://codepen.io/alleycaaat/pens/public'
              target='_blank'
              rel='noopener noreferrer'
            >
              See my other pens
            </a>
          </p>
          <p class='smol'>
            <a
              target='_blank'
              href='https://icons8.com/icon/59856/pencil'
              rel='noreferrer'
            >
              Pencil
            </a>{" "}
            icon by{" "}
            <a target='_blank' href='https://icons8.com' rel='noreferrer'>
              Icons8
            </a>{" "}
            <br />
            <a
              target='_blank'
              href='https://icons8.com/icon/VgohOTwokAJu/trash-can'
              rel='noreferrer'
            >
              Trash Can
            </a>{" "}
            icon by{" "}
            <a target='_blank' href='https://icons8.com' rel='noreferrer'>
              Icons8
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
