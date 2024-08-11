using DataProcessor.models;
using System.Text.Json;

// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");

var path = Path.Combine(System.IO.Directory.GetCurrentDirectory(), "..\\..\\..\\acncCharityDataRaw.json");
Console.WriteLine( path);
// D:\codeme\ChurchDbScraper\DataProcessor\bin\Debug\net8.0

var stream = new StreamReader(path);
var reader = JsonSerializer.Deserialize<List<CharityRaw>>(stream);
//Console.WriteLine(reader.)


