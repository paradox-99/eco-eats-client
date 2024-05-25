import FeaturedFoods from "../home/FeaturedFoods";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const AvalibleFoods = () => {
    const [count, setCount] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const [foodItems, setFoodItems] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3000/foodsCount')
        .then(res => {
            setCount(res.data.count)
        })
    },[])

    useEffect(() => {
        fetch(`http://localhost:3000/foodsPerPage?page=${currentPage}&size=${itemPerPage}`)
            .then(res => res.json())
            .then(data => setFoodItems(data))
    }, [currentPage, itemPerPage]);

    const numberOfPage = Math.ceil(count/itemPerPage);
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

    return (
        <div className="mt-14">
            <Helmet>
                <title>EcoEats || Available Foods</title>
            </Helmet>
            <div>
                <h1 className="text-5xl font-bold text-center mb-10">Currently available foods in our community</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-10">
                {
                    foodItems.map(food => <FeaturedFoods
                        key={food._id}
                        food={food}
                    ></FeaturedFoods>)
                }
            </div>
            <div className="flex justify-center mt-20">
                <button onClick={handlePrevPage} className="btn rounded-full hover:bg-primary font-montserrat text-base">Prev</button>
                {
                    pages.map(page => 
                    <button
                        className={`btn rounded-full mx-3 font-montserrat text-base ${currentPage === page ? 'btn-primary ' : undefined}`}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page}</button>)
                }
                <button onClick={handleNextPage} className="btn rounded-full hover:bg-primary">Next</button>
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