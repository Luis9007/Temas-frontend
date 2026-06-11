import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <span class="nav-brand">Sistema</span>
        <div class="nav-links">
          <a routerLink="/temas"       routerLinkActive="active">Temas</a>
          <a routerLink="/aprendices"  routerLinkActive="active">Aprendices</a>
          <a routerLink="/asignaciones" routerLinkActive="active">Asignaciones</a>
        </div>
      </div>
    </nav>
    <router-outlet />
  `,
  styles: [`
    .navbar {
      position: sticky; top: 0; z-index: 100;
      background: rgba(13,15,26,0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .nav-content {
      max-width: 900px; margin: 0 auto;
      padding: 0 1.25rem;
      display: flex; align-items: center; justify-content: space-between;
      height: 52px;
    }
    .nav-brand {
      font-size: .9rem; font-weight: 700; letter-spacing: -.02em;
      background: linear-gradient(135deg,#fff 30%,rgba(124,158,248,.9) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .nav-links {
      display: flex; gap: .25rem;
    }
    .nav-links a {
      padding: .4rem .85rem; border-radius: 8px;
      font-size: .83rem; font-weight: 500;
      color: rgba(255,255,255,0.5);
      text-decoration: none;
      border: 1px solid transparent;
      transition: all .18s;
    }
    .nav-links a:hover {
      color: rgba(255,255,255,0.85);
      background: rgba(255,255,255,0.06);
    }
    .nav-links a.active {
      color: rgba(200,215,255,0.95);
      background: rgba(124,158,248,0.12);
      border-color: rgba(124,158,248,0.3);
    }
    @media (max-width: 480px) {
      .nav-links a { padding: .35rem .6rem; font-size: .78rem; }
    }
  `]
})
export class AppComponent {}
