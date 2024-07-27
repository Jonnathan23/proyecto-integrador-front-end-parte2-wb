import { Routes } from '@angular/router';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { AdminbooksComponent } from './pages/adminbooks/adminbooks.component';
import { IniciarsesionComponent } from './pages/iniciarsesion/iniciarsesion.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { UserComponent } from './pages/user/user.component';
import { MybooksComponent } from './pages/mybooks/mybooks.component';
import { HistorybooksComponent } from './pages/historybooks/historybooks.component';
import { authGuard } from './guards/login.guard';

export const routes: Routes = [
    { path: 'bienvenido', component: BienvenidaComponent },
    { path: 'adminbooks', component: AdminbooksComponent, canActivate: [authGuard] },
    { path: 'mybooks', component: MybooksComponent, canActivate: [authGuard] },
    { path: 'historybooks', component: HistorybooksComponent, canActivate: [authGuard] },
    { path: 'iniciar', component: IniciarsesionComponent },
    { path: 'registrarse', component: RegistrarseComponent },
    { path: 'usuario', component: UserComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'bienvenido', pathMatch: 'full' },
];
