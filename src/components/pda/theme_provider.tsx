import  { createContext, useState, useEffect, PropsWithChildren} from 'react';

type Theme = "one-dark" | "paper-like" | "hacker";
function isTheme(value: any): value is Theme {
    return ["one-dark", "paper-like", "hacker"].includes(value);
}

const ThemeContext = createContext<{
    theme: Theme,
    toggleTheme: (_: Theme) => void
}>({
    theme: "one-dark",
    toggleTheme: _ => {}
});


export const ThemeProvider = (props: PropsWithChildren) => {

  const [theme, setTheme] = useState(() => {
    var savedTheme = localStorage.getItem('theme');
    if (isTheme(savedTheme)){
        return savedTheme
    }
    return "one-dark"
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  // text
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
