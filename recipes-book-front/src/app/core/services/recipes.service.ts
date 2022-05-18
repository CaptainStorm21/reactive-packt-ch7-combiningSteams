import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';
const BASE_PATH = environment.basePath

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`);
  private filterRecipeSubject = new BehaviorSubject<Recipe>({ title: '' });
  filterRecipesAction$ = this.filterRecipeSubject.asObservable();

  constructor(private http: HttpClient) { }

  updateFilter(criteria: Recipe) {
    this.filterRecipeSubject.next(criteria);
  }

  //step 2
  /**
   *
   * Let's think of the save operation as a stream;
   * it is the result of the this.service.saveRecipe(formValue)
   * method, which calls this.http.post<Recipe>(`${BASE_PATH}/recipes/save`,
   * formValue. We will call it the saveRecipe$ observable.
   * The saveRecipe$ observable is responsible for saving the data
   * in the backend. It will initiate the http request when subscribed to.

What we can do in this situation to avoid nested subscriptions is mapping or transforming the form value emitted by the valueChanges observable to the saveRecipe$ observable. The result is what we call a higher-order observable. Not clear? Don't worry, we will explain this in detail in the next section. So, what is a higher-order observable? And how can it help us in this situation?
   * @returns
   */
  saveRecipe(formValue: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${BASE_PATH}/recipes/save`, formValue);
  }


}

