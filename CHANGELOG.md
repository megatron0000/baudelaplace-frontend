# 1.1.0 (6/10/2017)

## New features

- Possibility of creating tags
- Possibility of choosing tags for questions using all-new `ListPickComponent`
- recaptcha on register page. Register not permitted on app, only on website
- `BauTagComponent` responds to mouseover changing background color
- `EnvVarFactory` for deciding on api endpoint and whether or not to allow registering
  - Allows `LOC_ENV='web'|'mobile'` custom environment variable

## Module segmentation

- `ListPickComponent`, `ElementHostDirective`, `ItemPick` moved to separate module
- `SearchPipe` created and delegated to separate `UtilsModule`

## Minor changes

- `BauCardComponent` and `LoginPage` use `DefaultAlertService`
- Removes `build/` and `resources` from git tracking
  - Building is now a prepublish script

# 1.0.6 (22/09/2017)

## Development facilities

- Project gains `typedoc` regulated by `typedoc.json` for generating docs
- Semicolons are removed from linting

## Theming

- Addition of `calm-green` and `old-yellow` colors to global sass variables

## Components

- `BauCardComponent` emits when card is successfully deleted, or issues error popup by itself if deletion fails

## Pages

- Creation of `CreateCardModal` modal page (with `question` and `answer` fields, i.e, no `tags` yet)
- `HomePage` opens create card modal and reacts to card deletion
- Switch in the logic from `LoginPage` and `RegisterPage`: Forms processed by them changed from angular-1 style to angular-2 style (programmatic control with `FormGroup`)

## Providers

- Creation of `CardsService` to communicate with backend.
  - Method's return values are consistent with `baudelaplace-bridge`
  - Methods promisify results before exporting them to other components
  - In case the server is down, only promisifying the `Response` obj would not respect the `bridge` module contract. Therefore this service detects `res.status === 0` and returns a `ServerDownError` (const from `bridge`) in such a case
- Bugfixes `AuthService`, which did not handle server down error correctly (same problem of `CardsService` above)
