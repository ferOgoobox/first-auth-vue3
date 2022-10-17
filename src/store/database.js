import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { auth, db } from "../firebaseConfig";
import { nanoid } from 'nanoid'
import  router from '../router'


export const useDatabaseStore = defineStore("database", {
    state: () => ({
        documents: [],
        loadig: false,
        loadingDoc: false
    }),
    actions: {
        async getUrls() {

            if(this.documents.length !== 0){
                return
            }
            this.loading = true

            const q = query(
                collection(db, "urls"),
                where("user", "==", auth.currentUser.uid)
            );
            try {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    this.documents.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                // console.log(doc.id, doc.data);

                });
            } catch (error) {
                console.log(error);
            } finally {
               this.loading = false
            }
        },
        async addUrl(name) {
            this.loadingDoc = true

            try {
                const objetoDoc = {
                    name: name,
                    short: nanoid(6),
                    user: auth.currentUser.uid,
                }
                const docRef = await addDoc(collection(db, "urls"), objetoDoc)
                this.documents.push({
                    ...objetoDoc,
                    id: docRef.id
                })

            } catch (error) {
                console.log(error.code)
                return error.code
            } finally {
                this.loadingDoc = false
            }
        },
        async deleteUrl(id) {
            this.loadingDoc = true
            try {
                const docRef = doc(db, "urls", id)
                const docSanp = await getDoc(docRef)

                if(!docSanp.exists()){
                    throw new Error("No existe el doc")
                }
                
                if(docSanp.data().user !== auth.currentUser.uid){
                    throw new Error("No le pertece ese documento")
                }
                await deleteDoc(docRef)
                this.documents = this.documents.filter(item => item.id !== id)
            
            } catch (error) {
                //console.log(error.message)
                return error.message
            } finally {
                this.loadingDoc = false
            }
        },
        async readUrl(id){
            this.loadingDoc = true
            try {
                const docRef = doc(db, "urls", id)
                const docSanp = await getDoc(docRef)

                if(!docSanp.exists()){
                    throw new Error("No existe el doc")
                }
                
                if(docSanp.data().user !== auth.currentUser.uid){
                    throw new Error("No le pertece ese documento")
                }

                return docSanp.data().name 
            } catch (error) {
                console.log(error.message)
            } finally {
                this.loadingDoc = false
            }
        },
        async updateUrl(id, name){
            this.loadingDoc = true
            
            try {
                const docRef = doc(db, "urls", id)
                const docSanp = await getDoc(docRef)

                if(!docSanp.exists()){
                    throw new Error("No existe el doc")
                }
                
                if(docSanp.data().user !== auth.currentUser.uid){
                    throw new Error("No le pertece ese documento")
                }

                await updateDoc(docRef, {
                    name: name
                })

                this.documents = this.documents.map(item => 
                    item.id === id ? ({...item, name:name}) : item)
                
                router.push('/')
            } catch (error) {
                console.log(error.message)
                return error.message
            } finally {
                this.loadingDoc = false
            }
        }
    },
});