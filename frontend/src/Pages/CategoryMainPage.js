import { Link } from "react-router-dom";
import React, { useEffect,useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { FaSearch,FaEdit,FaTimes, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { Container,  Row, Col } from 'react-bootstrap';
import { getCategories,setEditCategory,searchByCategoryName,removeCategory} from "../Slice/categorySlice";
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading";
import "../Styles/product_category.css";

export const CategoryMainPage = () => {

  const dispatch = useDispatch();
   const navigate = useNavigate();
  const { categories,loading,filterCategory } = useSelector((state) => state.category); 

  //for search query
  const [searchQuery, setSearchQuery] = useState("");
  //for inputfield cursor focus
  const inputRef = useRef(null);

  // Get categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  //to control the listing of categories
   let [currentCategories,setCurrentCategories]=useState(categories)
 //searching     
    const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    // Dispatch the action with the search query
    dispatch(searchByCategoryName(event.target.value));
    console.log(event.target.value)
    setCurrentCategories(filterCategory)
    console.log(currentCategories)
    inputRef.current.focus();
  };

  //function to call when user click delete button
    const removeItem = (category) => {
    dispatch(removeCategory(category));
    window.location.reload();
    setCurrentCategories(categories)
  };

  const removequery=()=>{
  setSearchQuery(""); 
  setCurrentCategories(categories)
}

  const setEdit = (cat) => {
  //get data from current category to set in the form when edit.
  const { category, categoryImage, userId } = cat;
  dispatch(
    setEditCategory({
      category,
      categoryImage,
      userId,
      editCategoryId: category.id,
    })
  );
    navigate("/addcategory")
  }

  return (

      <Container className="mainLayout">
        <Row className="uppderBar">
            
          <Col className="Search">
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  ref={inputRef}
                  className="keywordsearch form-control"
                  placeholder="Search by Category Name"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                {searchQuery && <FaTimes className="clear-icon" onClick={removequery} />}
              </div>
            </Col>
          
          <Col className="AddNew">
            <Link to="/addcategory">
              <FaPlusCircle className="menu-icon" />
              Add New Category
            </Link>
          </Col>
        </Row>

        <Row className="categoryContainer">
        {loading&&<Loading loading={loading}/>}
            
        {currentCategories !== undefined && currentCategories.map((cat) => (
              <Col key={cat.id} className="categoryCard"> 
                
                 <img src={cat.categoryImage} className="categoryimg" alt={cat.category} /> 
                <span className="categoryName">{cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}</span> 
                <Row>
                   <Col>
                     <button className="product_edit" type="button" onClick={()=>setEdit(cat)}>
                      <FaEdit className="menu-icon" />
                      </button>
                      </Col>
                      <Col>
                        <button className="product_delete" type="button" onClick={()=>removeItem(cat)}>
                          <FaTrashAlt className="menu-icon" />
                        </button>
                      </Col>
                </Row>
              </Col>
            ))} 
    
        
         
        </Row>
        <Row>

        </Row>
      </Container>

  );
}
