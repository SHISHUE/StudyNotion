import {toast} from 'react-hot-toast'
import { apiConnector } from '../apiconnector';
import {catalogData} from '../apis'

const {CATALOGPAGEDATA_API} = catalogData;

export async function getCatalogPageData(categoryId) {
  let result = [];
   const toastId = toast.loading("Loading")
  try {
    const res = await apiConnector("POST",CATALOGPAGEDATA_API,{categoryId: categoryId,});

    if(!res?.data?.success) {
        throw new Error("Could not fetch data")
    }

     result = res?.data;

  } catch (error) {
    // console.log("CATELOG PAGE DATA Error", error);
    toast.error(error.message)
    result = error.res?.data;
  }

  toast.dismiss(toastId);
  return result
}
