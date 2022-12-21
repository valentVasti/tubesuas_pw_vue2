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
<<<<<<< HEAD
                    component: importComponent("PenerbanganPage"),
                }
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
=======
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
>>>>>>> 169a062e2a7c7892e674f312c2db2194b4ad6385
            ],
        }
    ],
});

export default router;