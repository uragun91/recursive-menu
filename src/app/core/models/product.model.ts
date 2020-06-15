interface IProductDto {
  name: string,
  sale: number
}

export class Product {
  constructor(
    public name: string = '',
    public sale: number = 0
  ) { }

  public static build(data: Partial<IProductDto> = {}): Product {
    let sale: number = parseFloat(String(data.sale))
    if (isNaN(sale)) {
      sale = 0
    }
    return new Product(
      data.name || '',
      sale
    )
  }

}
