nohup npx serve -l 9091 -s build &
disown
tail -f nohup.out
