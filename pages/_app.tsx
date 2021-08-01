import { MainLayout } from '../layouts/MainLayout'
import '../styles/globals.css'



const  MyApp = ({ Component, pageProps }) => {
   

   const Layout = Component.layout || MainLayout; //create a default layout

   return(
            <Layout>
               <Component {...pageProps} />
            </Layout>
         )
   }

export default MyApp
