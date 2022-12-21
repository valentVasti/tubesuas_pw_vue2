import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponentAdmin(path){
    return () => import(`./components/Admin/${path}.vue`);
}

function importComponentUser(path){
    return () => import(`./components/User/${path}.vue`);
}

function importComponentAuth(path){
    return () => import(`./components/LoginRegis/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "loginPage",
            component: importComponentAuth("LoginPage"),
        },
        {
            path: "/register",
            name: "admin",
            component: importComponentAuth("RegisterPage"),
        },
        {
            path: "/AdminPage",
            name: "sideBarAdmin",
            component: importComponentAdmin("AppBarSideBarAdmin"),
            children: [
                {
                    path: "/hotelPage",
                    name: "hotelPage",
                    component: importComponentAdmin("HotelPage"),
                },
                {
                    path: "/kotaPage",
                    name: "kotaPage",
                    component: importComponentAdmin("KotaPage"),
                },
                {
                    path: "/penerbanganPage",
                    name: "penerbanganPage",
                    component: importComponentAdmin("PenerbanganPage"),
                },
            ],
        },
        {
            path: "/UserPage",
            name: "sideBarUser",
            component: importComponentUser("AppSideBarUser"),
            children: [
                {
                    path: "/tiketPage",
                    name: "tiketPage",
                    component: importComponentUser("TiketPage"),
                },
                {
                    path: "/paketPage",
                    name: "paketPage",
                    component: importComponentUser("PaketPage"),
                },
				{
                    path: "/transaksiPage",
                    name: "Transaksi",
                    component: importComponentUser("TransaksiPage"),
                },
                {
                    path: "/profileUser",
                    name: "profilePage",
                    component: importComponentUser("ProfilePageUser"),
                }                
            ],
        }
    ],
});

export default router;