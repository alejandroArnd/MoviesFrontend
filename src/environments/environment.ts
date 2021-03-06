// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  REST_API_SERVER :'http://vps722937.ovh.net:8000/',
  RECENTMOVIES:'recentmovies',
  GENRES:'genres',
  SEARCHMOVIES:'search',
  DETAILSMOVIE:'detailsmovies',
  REGISTER:'register',
  LOGIN:'login_check',
  REFRESH_TOKEN:'token/refresh',
  USERNAME:'username',
  CRITICS:'critics',
  DOCRITIC:'docritic',
  ALLUSER:'admin/allusers',
  GETROLES:'admin/getroles',
  DELETEUSER:'admin/deleteuser',
  ALLCRITICS:'admin/allcritics',
  AUTOCOMPLETEMOVIE:'autocompletemovie',
  DELETECRITIC:'admin/deletecritic',
  ALLMOVIES:'admin/allmovies',
  CREATEMOVIE:'admin/createmovie',
  UPDATEMOVIE:'admin/updatemovie',
  DELETEMOVIE:'admin/deletemovie'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
