import { Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "Products",
})
class Products extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;
  @Column({ type: DataType.FLOAT })
  declare price: number;
  @Column({ type: DataType.INTEGER })
  declare units: number;
  @Default(true)
  @Column({ type: DataType.BOOLEAN })
  declare availabity: boolean;
}

export default Products;
