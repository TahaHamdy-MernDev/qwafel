import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import authReducer from "./slices/auth-slice";
import { sizeApi } from "./services/products/sizes-api";
import { createWrapper } from "next-redux-wrapper";
import { colorApi } from "./services/products/colors-api";
import { categoryApi } from "./services/products/category-api";
import { productApi } from "./services/products/products-api";
import { warehousesApi } from "./services/inventory/warehouses-api";
export const makeStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
      [sizeApi.reducerPath]: sizeApi.reducer,
      [colorApi.reducerPath]: colorApi.reducer,
      [categoryApi.reducerPath]: categoryApi.reducer,
      [productApi.reducerPath]: productApi.reducer,
      [warehousesApi.reducerPath]: warehousesApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        sizeApi.middleware,
        colorApi.middleware,
        categoryApi.middleware,
        productApi.middleware,
        warehousesApi.middleware
      ),
  });
// Infer the `RootState` and `AppDispatch` types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
