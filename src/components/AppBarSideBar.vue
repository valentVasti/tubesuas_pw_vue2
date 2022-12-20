<template>
    <div>
        <v-navigation-drawer app v-model="drawer" width="16%" color="#ff8600" hide-overlay>
            <!-- <v-list-item>
                <v-list-item-content>
                    <v-img :src="require('@/assets/vuefire.png')" contain max-height="60"></v-img>
                </v-list-item-content>
            </v-list-item> -->
            <v-divider></v-divider>
            <v-list nav>
                <v-list-item class="my-5" v-for="menu in menus" :key="menu.title" link tag="router-link" :to="menu.to">
                    <v-list-item-icon>
                        <v-icon color="#ffff">{{ menu.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title style="font-family: Poppins; color: #ffff; font-size: 110.5%; font-weight: 600;">{{ menu.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <div class="fluid">
        <v-app-bar app fixed height="80%" color="#ffff">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <span class="navbartext">
                <!-- XXXX: NPM -->
                Vuefire - 0867
            </span>
        </v-app-bar>
        <div style="min-height: 100vh !important;">
            <router-view></router-view>
        </div>
        </div>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@500&display=swap');

    .navbartext{
        font-family: Poppins; 
        font-style:bold; 
        color: black;
        font-size: 20px;
    }
    .textfield{
        font-family: Poppins !important;
        color: black;
    }
</style>

<script>

export default {
    name: 'LayoutTemplate',
    data () {
        return {
            drawer: true,
            menus: [
                {title: 'Hotel', icon: 'mdi-album', to:'/hotelPage'},
                {title: 'Kota', icon: 'mdi-hand-heart-outline', to:'/kotaPage'},
                {title: 'Album', icon: 'mdi-album', to:'/album'},
                {title: 'Tiket', icon: 'mdi-ticket', to:'/tiketPage'},
            ],
        }
    }
}
</script>