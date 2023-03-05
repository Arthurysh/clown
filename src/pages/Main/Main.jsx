import classes from "./Main.module.scss";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom"


function Main() {
    return(
        <>
        <Header />
        <div className={classes.container}>
            <SideBar />
            <div className={classes.content_block}>
                <Outlet/>
            </div>
        </div>
        </>
    )
}

export default Main;