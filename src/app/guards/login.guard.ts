import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginserviceService } from "../services/foruser/loginservice.service";

/**
 * @description valida si el usuario está logeado para habilitar las rutas
 * @param route 
 * @param state 
 * @returns boolean
 */
export const authGuard: CanActivateFn = (route, state) => {
    const loginService = inject(LoginserviceService);
    const router = inject(Router);

    let auth = false;
    loginService.getUserActive().subscribe((user) => {
        const userLocal = loginService.getUserStorage()!;

        if (userLocal.us_id) {
            auth = true;
        } else {
            auth = user.us_id ? true : false;
        }
    })

    !auth && router.navigateByUrl('bienvenido');
    return auth;
}