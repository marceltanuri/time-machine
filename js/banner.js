function print_banner() {    
let banner = []
banner.push(
"    ████████╗██╗███╗   ███╗███████╗                         \n",
"    ╚══██╔══╝██║████╗ ████║██╔════╝                         \n",
"       ██║   ██║██╔████╔██║█████╗                           \n",
"       ██║   ██║██║╚██╔╝██║██╔══╝                           \n",
"       ██║   ██║██║ ╚═╝ ██║███████╗                         \n",
"       ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝                         \n",
"                                                            \n",
"    ███╗   ███╗ █████╗  ██████╗██╗  ██╗██╗███╗   ██╗███████╗\n",
"    ████╗ ████║██╔══██╗██╔════╝██║  ██║██║████╗  ██║██╔════╝\n",
"    ██╔████╔██║███████║██║     ███████║██║██╔██╗ ██║█████╗  \n",
"    ██║╚██╔╝██║██╔══██║██║     ██╔══██║██║██║╚██╗██║██╔══╝  \n",
"    ██║ ╚═╝ ██║██║  ██║╚██████╗██║  ██║██║██║ ╚████║███████╗\n",
"    ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝\n")
return banner.join("");
}
module.exports.print_banner = print_banner