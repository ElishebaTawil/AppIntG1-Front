import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const { shoppingCart } = useContext(ShopContext);

  useEffect(() => {
    const total = shoppingCart.reduce(
      (accumulator, currentValue) => accumulator + currentValue.new_price,
      0
    );
    setTotal(total);
  }, [shoppingCart]);

  return (
    <>
      {shoppingCart.map(({ name, new_price, old_price, category, id }) => {
        return (
          <>
            <CardContent key={id}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              ></Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {name} - {category}
              </Typography>
              <Typography variant="body2">
                {new_price}
                <br />
                {old_price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </>
        );
      })}
      <p>Total de la compra: {total}</p>
      <Link to="/payments">Hacer el pago</Link>
    </>
  );
};

export default Cart;
