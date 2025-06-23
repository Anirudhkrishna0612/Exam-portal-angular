// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { NormalGuard } from './pages/service/normal-guard';
import { AdminGuard } from './pages/service/admin-guard';
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
import { LoadQuizComponent } from './pages/user/pages/load-quiz/load-quiz';
// import { InstructionsComponent } from './pages/user/pages/instructions/instructions.component'; // REMOVED
import { StartQuizComponent } from './pages/user/pages/start-quiz/start-quiz';
import { ResultComponent } from './pages/user/result/result';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category';


export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: Signup },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: Dashboard,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: Welcome },
      { path: 'profile', component: ProfileComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'update-category/:cid', component: UpdateCategoryComponent },
      { path: 'quizzes', component: QuizzesComponent },
      { path: 'add-quiz', component: AddQuizComponent },
      { path: 'update-quiz/:quizId', component: UpdateQuizComponent },
      { path: 'view-questions/:qId/:title', component: ViewQuizQuestionsComponent },
      { path: 'add-question/:qId/:title', component: AddQuestionComponent },
      { path: 'update-question/:quesId/:qId/:title', component: UpdateQuestionComponent },
    ],
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      { path: ':catId', component: LoadQuizComponent },
      // { path: 'instructions/:quizId', component: InstructionsComponent }, // REMOVED
      { path: 'take-quiz/:quizId', component: StartQuizComponent },
      { path: 'result', component: ResultComponent }
    ],
  },
];
