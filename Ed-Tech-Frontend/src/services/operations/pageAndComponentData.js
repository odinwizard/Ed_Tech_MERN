import toast from "react-hot-toast";
import { catalogData } from "../api";
import { apiConnector } from "../apiconnector";

export const getCatalogPageData = async (categoryId) => {

    const toastId = toast.loading("Loading...");

    let result = [];

    try {
        
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API,
            {categoryId: categoryId,});
            console.log("page and component data", response);
            
            if (!response?.data?.success) {
                throw new Error("Could not fetch Category page data");
            }
         result = response?.data;


    } catch (error) {
        console.log("CATALOG PAGE DATA API ERROR...", error);
        toast.error(error.message);
        result = error.response?.data
    }

    toast.dismiss(toastId);
    return result;
 
}
