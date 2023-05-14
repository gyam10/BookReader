import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  favDetail: [],
};

export const FavSlicer = createSlice({
  name: "fav",
  initialState: initialState,
  reducers: {
    addBookToFav: (store, actions) => {
      let pre_fav = store.favDetail;
      if (!pre_fav || pre_fav.length <= 0) {
        store.favDetail.push(actions.payload);
        toast.success("Added to favourite sucessfully");
      } else {
        let index = null;
        store.favDetail.map((item, ind) => {
          if (item.book_id === actions.payload.book_id) {
            index = ind;
          }
        });
        if (index !== null) {
          toast.success("Already added to favourite");
        } else {
          pre_fav = [...pre_fav, actions.payload];
          store.favDetail = pre_fav;
          toast.success("Added to favourite sucessfully");
        }
      }
      localStorage.setItem("fav", JSON.stringify(store.favDetail));
    },
    removeBookFromFav: (store, actions) => {
      let pre_fav = store.favDetail;
      let index = null;
      store.favDetail.map((item, ind) => {
        if (item.book_id === actions.payload.book_id) {
          index = ind;
          pre_fav.splice(index, 1);
          toast.success("Sucessfully removed from favourite");
        } else {
          pre_fav = [...pre_fav, actions.payload];
          store.favDetail = pre_fav;
        }
        localStorage.setItem("fav", JSON.stringify(store.favDetail));
      });
    },
    syncLocalFav: (store) => {
      let all_books = JSON.parse(localStorage.getItem("fav")) || [];
      store.favDetail = all_books;
    },
  },
});

export const { addBookToFav, removeBookFromFav, syncLocalFav } =
  FavSlicer.actions;
export default FavSlicer.reducer;
