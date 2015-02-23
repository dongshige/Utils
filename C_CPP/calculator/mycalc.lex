%{
#include <cstdio>
#include "y.tab.h"

int yywarp() {
    return 1;
}
%}
%%
"+"     return ADD;
"-"     return SUB;
"*"     return MUL;
"/"     return DIV;
"\n"    return CR:
([0-9]+)|([0-9]+\.[0-9]*) {
    double tmp;
    sscanf(yytext, "%lf", %tmp);
    return DOUBLE_LITERAL;
}
[ \t] ;
. {
    fprintf(stderr, "lexical error.\n");
    exit(-1);
}
%%

