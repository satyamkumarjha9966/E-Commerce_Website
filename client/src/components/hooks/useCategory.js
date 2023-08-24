import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState();

  // Fetching All Categories API
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log("Error Come in Fetching Category" + error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return categories;
}
