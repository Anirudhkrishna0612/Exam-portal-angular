// src/app/app.routes.ts

import { Routes } from '@angular/router';

// IMPORTS: Ensure all components used in your routes are imported
// Removed '.ts' from imports where not necessary (standard Angular practice)
import { HomeComponent } from './pages/home/home';
import { Signup } from './pages/signup/signup';
import { LoginComponent } from './pages/login/login';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard';
import { Dashboard } from './pages/admin/dashboard/dashboard';

// Corrected Guard paths (assuming they are in src/app/service/)
import { NormalGuard } from './pages/service/normal-guard';
import { AdminGuard } from './pages/service/admin-guard';

// Admin Panel Components
import { ProfileComponent } from './pages/profile/profile';
import { Welcome } from './pages/admin/welcome/welcome'; 
import { CategoriesComponent } from './pages/admin/pages/admin/categories/categories';
import { AddCategoryComponent } from './pages/admin/pages/admin/add-category/add-category';
import { QuizzesComponent } from './pages/admin/pages/admin/quizzes/quizzes';
import { AddQuizComponent } from './pages/admin/pages/admin/add-quiz/add-quiz';
import { UpdateQuizComponent } from './pages/admin/pages/admin/update-quiz/update-quiz';
import { ViewQuizQuestionsComponent } from './pages/admin/pages/admin/view-quiz-questions/view-quiz-questions';
import { AddQuestionComponent } from './pages/admin/pages/admin/add-question/add-question';
import { UpdateQuestionComponent } from './pages/admin/pages/admin/update-question/update-question';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category'; // Assuming update-category.component.ts

// User Panel Components
import { LoadQuizComponent } from './pages/user/pages/load-quiz/load-quiz';
import { StartQuizComponent } from './pages/user/pages/start-quiz/start-quiz';
import { ResultComponent } from './pages/user/result/result';

// IMPORTANT: Define this placeholder component if it doesn't exist
// This is needed for the 'View' button in load-quiz.html
import { ViewQuizDetailsComponent } from './pages/user/pages/view-quiz-details/view-quiz-details.component'; // Ensure this path is correct if you have it


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: Signup,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: Dashboard, // Renamed to Dashboard from AdminDashboard for consistency
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: Welcome,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'update-category/:cId',
        component: UpdateCategoryComponent
      },
      {
        path: 'quizzes',
        component: QuizzesComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'update-quiz/:qId',
        component: UpdateQuizComponent
      },
      {
        path: 'view-questions/:qId/:title',
        component: ViewQuizQuestionsComponent
      },
      {
        path: 'add-question/:qId/:title',
        component: AddQuestionComponent
      },
      {
        path: 'update-question/:qId/:quesId/:title',
        component: UpdateQuestionComponent
      }
    ]
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: '',
        component: LoadQuizComponent // Default for user dashboard
      },
      {
        path: 'load-quiz',
        component: LoadQuizComponent, // Displays all quizzes or by category
        children: [
          {
            path: ':catId', // Optional category ID
            component: LoadQuizComponent
          }
        ]
      },
      {
        path: 'start-quiz/:qId/:title', // Target for "Start" button
        component: StartQuizComponent
      },
      {
        path: 'view-quiz-details/:qId/:title', // Target for "View" button
        component: ViewQuizDetailsComponent // Ensure this component exists!
      },
      {
        path: 'result/:qId/:marksGot/:correctAnswers/:attempted',
        component: ResultComponent
      }
    ]
  }
];
