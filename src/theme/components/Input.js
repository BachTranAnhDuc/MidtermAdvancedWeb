import style from "styled-components";
import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";

const MUIInputCustom01 = styled(TextField)({
  "& label.Mui-focused": {
    color: "#c2edc2",
    fontSize: 14,
  },
  "& label": {
    fontSize: 16,
    color: "#388078",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#388078",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#20c997",
      border: "2px solid #388078",
      fontSize: 16,
    },
    "&:hover fieldset": {
      borderColor: "#388078",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#c2edc2",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: 16,
    letterSpacing: 1.6,
  },
});

const MUIInputCustom02 = styled(TextField)({
  "& label.Mui-focused": {
    color: "var(--color-secondary)",
    fontSize: "1.4rem",
    letterSpacing: "0.1rem",
  },
  "& label": {
    fontSize: "1.4rem",
    color: "var(--color-primary)",
    letterSpacing: "0.1rem",
  },

  "& helperText": {
    fontSize: "1.4rem",
    // color: 'var(--color-primary)',
    letterSpacing: "0.1rem",
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "&": {
      fontSize: "1.2rem",
      letterSpacing: "0.2rem",
    },
    "& fieldset": {
      fontSize: "1.2rem",
      // border: '1.5px solid var(--color-primary)',
      borderColor: "var(--color-primary)",
    },
    "&:hover fieldset": {
      // border: '1.5px solid var(--color-primary-light-5)',
      borderColor: "var(--color-primary-light-5)",
    },
    "&.Mui-focused fieldset": {
      fontSize: "1.2rem",
      // border: '1.5px solid var(--color-primary-dark-5)',
      borderColor: "var(--color-primary-dark-5)",
    },
  },
});
const MUIInputCustom03 = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
    fontSize: "1.4rem",
    letterSpacing: "0.1rem",
  },
  "& label": {
    fontSize: "1.4rem",
    color: "var(--color-primary)",
    letterSpacing: "0.1rem",
  },

  "& helperText": {
    fontSize: "1.4rem",
    // color: 'var(--color-primary)',
    letterSpacing: "0.1rem",
  },

  "& .MuiInput-underline:after": {
    // borderBottomColor: 'green',
  },
  "& .MuiOutlinedInput-root": {
    "&": {
      fontSize: "1.2rem",
      letterSpacing: "0.2rem",
      backgroundColor: "var(--color-white)",
    },
    "& fieldset": {
      fontSize: "1.2rem",
      // border: '1.5px solid var(--color-primary)',
      borderColor: "none",
      border: "none",
      outline: "none",
    },
    "&:hover fieldset": {
      // border: '1.5px solid var(--color-primary-light-5)',
      // borderColor: 'none',
    },
    "&.Mui-focused fieldset": {
      fontSize: "1.2rem",
      // border: '1.5px solid var(--color-primary-dark-5)',
      // borderColor: 'none',
    },
  },
});

const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "var(--color-white)",
    fontSize: "1.4rem",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      // backgroundColor: 'transparent',
    },
    "&.Mui-focused": {
      // backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      // borderColor: theme.palette.primary.main,
      border: "2px solid var(--color-primary-dark-2)",
    },
  },
  "& .label": {
    fontSize: "1.6rem",
  },
}));

const MUIFileInputCustom = styled(Input)({
  "&	.MuiFilledInput-root": {},
});
const MUIFileInputStyled = styled(FilledInput)({
  "&	.MuiFilledInput-root": {},
});

export {
  MUIInputCustom01,
  MUIInputCustom02,
  MUIInputCustom03,
  MUIFileInputStyled,
  MUIFileInputCustom,
  RedditTextField,
};
