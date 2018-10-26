%{

const { astNewApp, astNewFunc, astNewVar } = require('./ast');
let deBruijn = 0;
const indices = {};

%}

%start expr

%%

expr: applist | lastapp | lambda;
lastapp: applist lambda {{ $$ = astNewApp($1, $2); }};
applist: applist callableExpr {{ $$ = astNewApp($1, $2); }} | callableExpr;
callableExpr: bracexpr | var;
lambda: LAMBDA curry {{ $$ = $2; }};
curry: DOT expr {{ $$ = $2; }} | IDENT { indices[$1] = deBruijn++; } curry {{ $$ = astNewFunc($1, $3); }};
bracexpr: LBRAC expr RBRAC {{ $$ = $2; }};
var: IDENT {{ $$ = astNewVar($1, deBruijn - (indices[$1] || 0)); }};
