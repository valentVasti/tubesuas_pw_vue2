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
                    path: "/tiketPage",
                    name: "Root",
                    component: importComponentAdmin("TiketPage"),
                },
                {
                    path: "/penerbanganPage",
                    name: "penerbanganPage",
                    component: importComponent("PenerbanganPage"),
                },
                {
                    path: "/paketPage",
                    name: "paketPage",
                    component: importComponent("PaketPage"),
                }
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
                // {
                //     path: "/kotaPage",
                //     name: "kotaPage",
                //     component: importComponentAdmin("KotaPage"),
                // },
                // {
                //     path: "/tiketPage",
                //     name: "Root",
                //     component: importComponentAdmin("TiketPage"),
                // },
                // {
                //     path: "/penerbanganPage",
                //     name: "penerbanganPage",
                //     component: importComponentAdmin("PenerbanganPage"),
                // }
            ],
        }
    ],
});

export default router;