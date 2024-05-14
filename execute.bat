@echo off
cls
start cmd /k "cd C:/POS_modules/POS_Modules/client && npm run start"
start cmd /k "cd C:/POS_modules/POS_Modules/server && npm run dev"
exit    