import {  CanActivateFn, Router } from "@angular/router"
import { AuthService } from "../services/auth.service"
import { inject } from "@angular/core"



export const AuthGuard:CanActivateFn=(route,state)=>{
    const authservice=inject (AuthService)
    const router=inject (Router)
    if(authservice.isLoggedin){
        return true
    }
    else{
        router.navigateByUrl("/login")
        return false
    }
}