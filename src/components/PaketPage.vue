<template>
    <v-main>
       <v-card elevation="3" class="mt-5 mx-6" style="border-radius: 6px;">
            <v-row justify="center" align="center" style="margin:3px auto;">
                <v-col>
                    <v-select :items="kota" item-text="nama_kota" item-value="id" v-model="transaksi.kota_asal" outlined label="Kota Asal"></v-select>
                </v-col>
                <v-col>
                    <v-select :items="kota" item-text="nama_kota" item-value="id" v-model="transaksi.kota_tujuan" outlined label="Kota Tujuan"></v-select>
                </v-col>
            </v-row>
        </v-card>
        <v-card elevation="3" style="border-radius: 6px;" class="mt-5 mx-6">
            <v-data-table :headers="headersHotel" 
            :items="hotel" 
            :items-per-page="10">
            </v-data-table>
        </v-card>

        <v-card elevation="3" style="border-radius: 6px;" class="mt-5 mx-6">
            <v-data-table :headers="headersPenerbangan" 
            :items="penerbangan" 
            :items-per-page="10">
            </v-data-table>
        </v-card>

        <v-card elevation="3" style="border-radius: 6px;" class="mt-5 mx-6">
            <h1>Form Data</h1>
                <v-container> 
                    <v-form ref="form">
                        <v-row justify="center" align="center" style="margin:3px auto;">
                            <v-col>
                                <v-select :items="kota" item-text="nama_kota" item-value="id" v-model="transaksi.kota_asal" label="Kota Asal" disabled></v-select>
                            </v-col>
                            <v-col>
                                <v-select :items="kota" item-text="nama_kota" item-value="id" v-model="transaksi.kota_tujuan" label="Kota Tujuan" disabled></v-select>
                            </v-col>
                        </v-row>
                        <v-row></v-row>
                        <v-row justify="center" align="center" style="margin:3px auto;">
                            <v-select :items="hotel" item-text="nama_hotel" item-value="id" v-model="transaksi.id_hotel" label="Nama Hotel" disabled></v-select>
                            <v-select :items="hotel" item-text="bintang" item-value="id" v-model="transaksi.id_hotel" label="Bintang" disabled></v-select>
                            <v-select :items="hotel" item-text="nama_kota" item-value="id" v-model="transaksi.id_hotel" label="Kota" disabled></v-select>
                            <v-select :items="hotel" item-text="harga" item-value="id" v-model="transaksi.id_hotel" label="Harga" disabled></v-select>
                        </v-row>
                        <v-row></v-row>
                        <v-row justify="center" align="center" style="margin:3px auto;">
                            <v-select :items="penerbangan" item-text="nama_maskapai" item-value="id" v-model="transaksi.id_penerbangan" label="Nama Maskapai" disabled></v-select>
                            <v-select :items="penerbangan" item-text="nama_kota" item-value="id" v-model="transaksi.id_penerbangan" label="Kota Asal" disabled></v-select>
                            <v-select :items="penerbangan" item-text="nama_kota" item-value="id" v-model="transaksi.kota_tujuan" label="Kota Tujuan" disabled></v-select>
                            <v-select :items="penerbangan" item-text="kelas" item-value="id" v-model="transaksi.id_penerbangan" label="Kelas" disabled></v-select>
                            <v-select :items="penerbangan" item-text="harga" item-value="id" v-model="transaksi.id_penerbangan" label="Harga" disabled></v-select>
                        </v-row>
                    </v-form>
                </v-container> 
        </v-card>
        <!-- <V-snackbar v-model="snackbar"  style="font-family: Poppins;" :color="color" timeout="2000" top>{{ error_message }}</v-snackbar>  -->
    </v-main>
</template>

<style lang="css">
    @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap');

    thead tr th span {
        font-size: 160% !important;
        font-family: Poppins !important;
        letter-spacing: 2%;
        font-weight: 600;
        color: black !important;
    }

    tbody tr td{
        font-size: 100% !important;
        font-family: Poppins !important;
        letter-spacing: 2%;
        font-weight: 100;
        color: black !important;
    }

    .textfield{
        font-family: Poppins !important;
        color: black;
    }

    .v-list-item__title{
        font-family: Poppins !important;
        color: black;
    }

</style>

<script>
import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'

export default {
    data(){
        return{
            headersHotel: [
                {text: "Nama Hotel", value: "nama_hotel"},
                {text: "Bintang", value: "bintang"},
                {text: "Lokasi Kota", value: "nama_kota"},
                {text: "Harga", value: "harga"},
            ], 
            headersPenerbangan: [
                {text: "Nama Maskapai", value: "nama_maskapai"},
                {text: "Kota Keberangkatan", value: "nama_kota"},
                {text: "Kelas", value:"kelas"},
                {text: "Harga", value: "harga"},
            ],
        }
    },
    setup() {
        let kota = ref([])

        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/kotas').then(response => {
                //assign state posts with response data
                kota.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        let hotel = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/hotels').then(response => {
                //assign state posts with response data
                hotel.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        let penerbangan = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get('http://127.0.0.1:8000/api/penerbangans').then(response => {
                //assign state posts with response data
                penerbangan.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        const transaksi = reactive({
            kota_asal:'',
            kota_tujuan:'',
            id_hotel:'',
            id_penerbangan:''
        })

        return{
            kota,
            hotel,
            penerbangan,
            transaksi
        }
    },
    methods:{
        closeDialog() {
            this.dialog = false;
            this.formType = 0;
            this.$refs.form.reset();
        },
    },
}

</script>
