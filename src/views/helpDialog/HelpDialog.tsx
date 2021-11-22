import React, { useState } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {
  AiOutlineSetting,
  AiOutlineQuestionCircle,
  AiOutlineClose,
  AiOutlineDownload,
} from "react-icons/ai";

import { SymbolButton } from "../../components/settings/styles.Settings";
import { appColors } from "../../config/colors";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(3),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(2),
      top: theme.spacing(2),
      color: appColors.highlight,
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Schließen"
          className={classes.closeButton}
          onClick={onClose}
        >
          <AiOutlineClose color={appColors.inputOutline} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0, 3, 3),
  },
}))(MuiDialogContent);

export const HelpButton: React.FC = ({}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SymbolButton title="Hilfe anzeigen" tabIndex={0}>
        <AiOutlineQuestionCircle
          color={
            open ? appColors.buttonBackground : appColors.headerFontPrimary
          }
          size="28px"
          onClick={handleClickOpen}
        />
      </SymbolButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Hilfe zu den Grafiken
        </DialogTitle>
        <DialogContent>
          <p>
            <em>
              Dieses Online-Werkzeug hilft dir dabei, Corona-Grafiken in
              verschiedenen Formaten zu erstellen. Die Web-Anwendung
              funktioniert am besten in Google Chrome oder Mozilla Firefox.
            </em>
          </p>
          <p>
            <strong>Download:</strong> Die Grafiken lassen sich im PNG- und
            SVG-Format herunterladen (
            <AiOutlineDownload style={{ verticalAlign: "middle" }} />
            ). <em>PNG-Grafiken</em> können direkt im CMS oder auf verschiedenen
            Social-Media-Plattformen verwendet werden. Das <em>SVG-Format</em>{" "}
            eignet sich, um eine Grafik in Adobe Illustrator oder After Effects
            zu bearbeiten.
          </p>
          <p>
            <strong>Weitere Einstellungen:</strong> Mit einem Klick auf das
            Zahnrad (<AiOutlineSetting style={{ verticalAlign: "middle" }} />)
            kann man sich weitere Grafikeinstellungen anzeigen lassen. Hier kann
            man die <em>Höhe</em> und die <em>Größe</em> einer Grafik ändern,
            wenn man mit den Voreinstellungen nicht zufrieden ist. Außerdem kann
            man die <em>Skalierung</em> einer Grafik verändern. Die Skalierung
            beeinflusst gleichzeitig die Schrift-, Logo- und Diagrammgröße.
          </p>
          <p>
            Bei manchen Grafiken lässt sich auch der Zeitraum (
            <em>Start-/Enddatum</em>) verändern. Dadurch kann man in die
            Vergangenheit reisen, um zum Beispiel eine Karte mit den
            Corona-Inzidenzen des vergangenen Jahres zu erstellen.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};
