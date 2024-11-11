import {  CanActivateFn, Router } from "@angular/router"
import { AuthService } from "../services/auth.service"
import { inject } from "@angular/core"



export const AdminGaurd:CanActivateFn=(route,state)=>{
    const authservice=inject (AuthService)
    const router=inject (Router)
    if(authservice.isLoggedin){
        if(authservice.isAdmin){
             return true
        }
       else{
        router.navigateByUrl("/")
        return false
       }
    }
    else{
        router.navigateByUrl("/login")
        return false
    }
}