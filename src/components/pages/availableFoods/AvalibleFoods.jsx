import FeaturedFoods from "../home/FeaturedFoods";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const AvalibleFoods = () => {
    const [count, setCount] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const [foodItems, setFoodItems] = useState([]);
    const [search, setSearch] = useState("");
    const [sortValue, setSortValue] = useState("0");

    useEffect(() => {
        axios.get('http://localhost:3000/foodsCount')
            .then(res => {
                setCount(res.data.count)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:3000/foodsPerPage?page=${currentPage}&size=${itemPerPage}&sortValue=${sortValue}`)
            .then(res => res.json())
            .then(data => setFoodItems(data))
    }, [currentPage, itemPerPage, sortValue]);

    const numberOfPage = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPage).keys()];

    const handleItemsPerPage = e => {
        const number = e.target.value;
        setItemPerPage(number);
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    const searchValue = e => {
        const value = e.target.value;
        setSearch(value);
    }

    const sortValues = e => {
        let value = e.target.value;
        setSortValue(value);
    }

    const searchFood = () => {
        if (search.length > 0) {
            axios.get(`http://localhost:3000/searchFood?foodName=${search}`)
                .then(res => {
                    setCount(res.data.length);
                    setFoodItems(res.data);
                })
        }
    }

    return (
        <div className="mt-10">
            <Helmet>
                <title>EcoEats || Available Foods</title>
            </Helmet>
            <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10">Currently available foods in our community</h1>
                <div className="my-10 flex flex-col md:flex-row justify-center items-center gap-20">
                    <label className="input border-2 input-primary flex items-center gap-2">
                        <input type="search" className="grow text-base font-medium font-manrope" placeholder="Search" onChange={searchValue} />
                        <button onClick={searchFood}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg></button>
                    </label>
                    <select className="select border-2 select-primary text-base font-medium w-full font-manrope max-w-xs" onChange={sortValues}>
                        <option disabled selected>Sort by Expire date</option>
                        <option value={1}>Ascending</option>
                        <option value={-1}>Descending</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-5 md:gap-10">
                {
                    foodItems.map(food => <FeaturedFoods
                        key={food._id}
                        food={food}
                    ></FeaturedFoods>)
                }
            </div>
            <div className="flex justify-center items-center gap-5 mt-10 md:mt-20 flex-col md:flex-row">
                <div>
                    <button onClick={handlePrevPage} className="btn w-fit rounded-full hover:bg-primary font-montserrat text-sm md:text-base">Prev</button>
                    <button onClick={handleNextPage} className="btn md:hidden ml-3 rounded-full hover:bg-primary text-sm md:text-base w-fit">Next</button>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-3">
                    {
                        pages.map(page =>
                            <button
                                className={`btn rounded-full font-montserrat text-sm md:text-base ${currentPage === page ? 'btn-primary ' : undefined}`}
                                onClick={() => setCurrentPage(page)}
                                key={page}
                            >{page+1}</button>)
                    }
                </div>
                <button onClick={handleNextPage} className="btn rounded-full hover:bg-primary text-sm md:text-base w-fit hidden md:flex">Next</button>
                <select value={itemPerPage} onChange={handleItemsPerPage} className="select select-bordered w-full max-w-20 font-montserrat text-base font-medium ml-5" name="" id="">
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9" selected>9</option>
                    <option value="12">12</option>
                </select>
            </div>
        </div>
    );
};

export default AvalibleFoods;